import NavBottom from '@/components/NavBottom';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MyComponent/NavBottom',
  component: NavBottom,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      //   navigation: {
      //     pathname: '/',
      //   },
    },
  },
} satisfies Meta<typeof NavBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    pathname: '/',
  },
};

export const Monthly: Story = {
  args: {
    pathname: '/monthly',
  },
};

export const TodoList: Story = {
  args: {
    pathname: '/todolist',
  },
};

export const MyPage: Story = {
  args: {
    pathname: '/mypage',
  },
};
