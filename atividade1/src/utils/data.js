export const listData = Array.from({ length: 20 }, (_, i) => ({
  id: String(i),
  title: `Item da Lista ${i + 1}`,
}));

export const sectionData = [
  { title: 'Grupo A', data: ['item 1', 'item 2'] },
  { title: 'Grupo B', data: ['item 3', 'item 4', 'item 5'] },
];