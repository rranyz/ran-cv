import type { Meta, StoryObj } from '@storybook/react'

import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    id: 'input-text'
  }
}
