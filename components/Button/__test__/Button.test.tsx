import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button компонент', () => {

  test('кнопка неактивна', async () => {
    const mockOnClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button isDisabled={true} onClick={mockOnClick}>
        Неактивна
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await user.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});