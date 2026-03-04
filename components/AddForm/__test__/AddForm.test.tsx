import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddForm from '../AddForm';

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
beforeEach(() => {
  mockFetch.mockClear();
})

describe('AddForm', () => {

  test('отправляет форму и показывает сообщение об успехе', async () => {
    const mockSuccessResponse = {
      ok: true,
      json: async () => ({ success: true }),
    } as Response;

    mockFetch.mockResolvedValueOnce(mockSuccessResponse);
    const user = userEvent.setup();

    render(<AddForm />);

    await user.type(screen.getByLabelText(/Заголовок/i), 'Тест');
    await user.type(screen.getByLabelText(/Slug/i), 'test-article');
    await user.type(screen.getByLabelText(/Контент/i), 'Test content');

    const submitButton = screen.getByRole('button', { name: /Добавить статью/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('/api/articles/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('Тест'),
      });
      expect(screen.getByText(/Статья добавлена/i)).toBeInTheDocument();
    });
  });
});