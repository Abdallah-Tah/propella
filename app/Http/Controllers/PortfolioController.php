<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PortfolioItem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->portfolioItems();

        // Filter by category if provided
        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // Filter by featured status
        if ($request->boolean('featured_only')) {
            $query->featured();
        }

        // Filter by public status
        if ($request->has('public')) {
            $query->where('is_public', $request->boolean('public'));
        }

        $items = $query->ordered()->paginate(12);

        return response()->json([
            'items' => $items,
            'categories' => $this->getCategories($request->user()),
            'stats' => [
                'total' => $request->user()->portfolioItems()->count(),
                'featured' => $request->user()->portfolioItems()->featured()->count(),
                'public' => $request->user()->portfolioItems()->public()->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'category' => 'required|string|max:100',
            'skills_used' => 'array',
            'technologies' => 'array',
            'project_url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'client_name' => 'nullable|string|max:255',
            'project_duration' => 'nullable|integer|min:1|max:3650',
            'budget_range' => 'nullable|string|max:100',
            'completion_date' => 'nullable|date|before_or_equal:today',
            'testimonial' => 'nullable|string|max:2000',
            'outcome_metrics' => 'nullable|string|max:500',
            'challenges_solved' => 'nullable|string|max:1000',
            'is_featured' => 'boolean',
            'is_public' => 'boolean',
            'upwork_project_id' => 'nullable|string|max:100',
            'images' => 'array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120' // 5MB max
        ]);

        // Handle image uploads
        $imageUrls = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('portfolio/' . $request->user()->id, 'public');
                $imageUrls[] = Storage::url($path);
            }
        }

        // Create portfolio item
        $item = PortfolioItem::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'skills_used_json' => $validated['skills_used'] ?? [],
            'technologies_json' => $validated['technologies'] ?? [],
            'image_urls_json' => $imageUrls,
            'sort_order' => $this->getNextSortOrder($request->user()),
        ]);

        return response()->json([
            'message' => 'Portfolio item created successfully',
            'item' => $item->load(['user'])
        ], 201);
    }

    public function show(Request $request, PortfolioItem $portfolioItem)
    {
        // Check if user owns this item OR if it's public
        if ($portfolioItem->user_id !== $request->user()->id && !$portfolioItem->is_public) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json([
            'item' => $portfolioItem->load(['user']),
            'related_items' => $this->getRelatedItems($portfolioItem)
        ]);
    }

    public function update(Request $request, PortfolioItem $portfolioItem)
    {
        // Ensure user owns this item
        if ($portfolioItem->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:5000',
            'category' => 'sometimes|required|string|max:100',
            'skills_used' => 'sometimes|array',
            'technologies' => 'sometimes|array',
            'project_url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'client_name' => 'nullable|string|max:255',
            'project_duration' => 'nullable|integer|min:1|max:3650',
            'budget_range' => 'nullable|string|max:100',
            'completion_date' => 'nullable|date|before_or_equal:today',
            'testimonial' => 'nullable|string|max:2000',
            'outcome_metrics' => 'nullable|string|max:500',
            'challenges_solved' => 'nullable|string|max:1000',
            'is_featured' => 'boolean',
            'is_public' => 'boolean',
            'upwork_project_id' => 'nullable|string|max:100',
            'sort_order' => 'integer|min:0',
            'new_images' => 'array|max:10',
            'new_images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'remove_images' => 'array', // URLs to remove
        ]);

        // Handle new image uploads
        $currentImages = $portfolioItem->image_urls ?? [];
        
        // Remove specified images
        if (isset($validated['remove_images'])) {
            $currentImages = array_diff($currentImages, $validated['remove_images']);
            // TODO: Actually delete files from storage
        }

        // Add new images
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $image) {
                $path = $image->store('portfolio/' . $request->user()->id, 'public');
                $currentImages[] = Storage::url($path);
            }
        }

        // Update the item
        $updateData = collect($validated)->except(['new_images', 'remove_images', 'skills_used', 'technologies'])->toArray();
        
        if (isset($validated['skills_used'])) {
            $updateData['skills_used_json'] = $validated['skills_used'];
        }
        if (isset($validated['technologies'])) {
            $updateData['technologies_json'] = $validated['technologies'];
        }
        
        $updateData['image_urls_json'] = array_values($currentImages);

        $portfolioItem->update($updateData);

        return response()->json([
            'message' => 'Portfolio item updated successfully',
            'item' => $portfolioItem->fresh()
        ]);
    }

    public function destroy(Request $request, PortfolioItem $portfolioItem)
    {
        // Ensure user owns this item
        if ($portfolioItem->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // TODO: Delete associated image files from storage
        
        $portfolioItem->delete();

        return response()->json([
            'message' => 'Portfolio item deleted successfully'
        ]);
    }

    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:portfolio_items,id',
            'items.*.sort_order' => 'required|integer|min:0'
        ]);

        foreach ($validated['items'] as $item) {
            PortfolioItem::where('id', $item['id'])
                ->where('user_id', $request->user()->id)
                ->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json([
            'message' => 'Portfolio order updated successfully'
        ]);
    }

    public function getPublicPortfolio(Request $request, $userId)
    {
        $items = PortfolioItem::where('user_id', $userId)
            ->public()
            ->ordered()
            ->get();

        return response()->json([
            'items' => $items,
            'user' => \App\Models\User::with('profile')->find($userId)
        ]);
    }

    private function getCategories($user)
    {
        return $user->portfolioItems()
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values()
            ->toArray();
    }

    private function getNextSortOrder($user)
    {
        return $user->portfolioItems()->max('sort_order') + 1;
    }

    private function getRelatedItems($portfolioItem)
    {
        return PortfolioItem::where('user_id', $portfolioItem->user_id)
            ->where('id', '!=', $portfolioItem->id)
            ->where(function ($query) use ($portfolioItem) {
                $query->where('category', $portfolioItem->category)
                      ->orWhereJsonContains('skills_used_json', $portfolioItem->skills_used[0] ?? null);
            })
            ->public()
            ->limit(3)
            ->get(['id', 'title', 'description', 'first_image', 'category']);
    }
}