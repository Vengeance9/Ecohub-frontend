export interface IReplies {
  id: string;
  comment: string;
  parentId: string;
  createdAt: string;
  isDeleted: boolean;
  ideaId: string;
  parent: { user: { id: string; name: string } };
  user: {
    id: string;
    name: string;
  };
  _count: {
    replies: number;
  };
}

export interface IReplyData {
  success: boolean;
  message: string;
  data: IReplies[];
}
