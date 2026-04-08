//criei estes dados falsos para testar e popular as listas, foram separados da lógica para manter os componentes de UI limpos

//array simples para a flatlist
export const listData = Array.from({ length: 20 }, (_, i) => ({
  id: String(i),
  title: `Item da Lista ${i + 1}`,
}));

//arry com estrutura de seções para a sectionlist
export const sectionData = [
  { title: 'Grupo A', data: ['item 1', 'item 2'] },
  { title: 'Grupo B', data: ['item 3', 'item 4', 'item 5'] },
];