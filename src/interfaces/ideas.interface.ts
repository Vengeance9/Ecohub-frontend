export interface IFormData {
  title: string;
  description: string;
  problem: string;
  solution: string;
  isPaid: boolean;
  price?: number | undefined;
  categoryId: string;
}
