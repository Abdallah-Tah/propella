import React from 'react';

export const Table = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <table className={`table-auto w-full border-collapse ${className || ''}`}>{children}</table>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100 border-b">{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b hover:bg-gray-50">{children}</tr>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="p-4 text-left">{children}</td>
);
