import { useState } from 'react';
import Field from '../Field/Field';
import Button from '../Button/Button';
import styles from './AddForm.module.sass';

export default function AddForm() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    content: ''
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/articles/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Статья добавлена' });

        setFormData({
          title: '',
          slug: '',
          date: new Date().toISOString().split('T')[0],
          description: '',
          content: ''
        });
      } else {
        setStatus({ type: 'error', message: `Ошибка: ${data.message}` });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Ошибка' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Добавить новую статью</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Field
          label="Заголовок"
          id="title"
          value={formData.title}
          onChange={onChange}
          required
          placeholder="заголовок"
        />
        <Field
          label="Slug"
          id="slug"
          value={formData.slug}
          onChange={onChange}
          required
          placeholder="slug"
        />
        <Field
          label="Дата"
          id="date"
          type="date"
          value={formData.date}
          onChange={onChange}
        />
        <Field
          label="Краткое описание"
          id="description"
          value={formData.description}
          onChange={onChange}
          isTextarea={true}
          placeholder="описание"
        />
        <Field
          label="Контент"
          id="content"
          value={formData.content}
          onChange={onChange}
          required
          isTextarea={true}
          placeholder="Контент"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          Добавить статью
        </Button>
        {status && (
          <div className={styles.alert} >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}