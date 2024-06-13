import { axios } from '@/services/instance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type TodoItem = {
  id: number;
  created_at: string;
  updated_at: string;
  todo_item: string;
  done: boolean;
  post: 1;
};

const fetchTodos = async () => {
  const response = await axios.get<TodoItem[]>('posts/todo/1');

  return response.data;
};

export const useTodos = () => {
  return useQuery({
    queryKey: ['todolist', 1],
    queryFn: () => fetchTodos(),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => axios.delete(`posts/todo/1/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolist', 1] });
    },
  });
};
