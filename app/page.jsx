'use client';
 
import { useState } from 'react';
 
const BOOKS = [
  {
    id: 1,
    title: 'Book One',
    cover: 'https://covers.openlibrary.org/b/id/8231996-L.jpg',
    link: 'https://app.thestorygraph.com'
  },
  {
    id: 2,
    title: 'Book Two',
    cover: 'https://covers.openlibrary.org/b/id/10523338-L.jpg',
    link: 'https://app.thestorygraph.com'
  },
  {
    id: 3,
    title: 'Book Three',
    cover: 'https://covers.openlibrary.org/b/id/10909258-L.jpg',
    link: 'https://app.thestorygraph.com'
  }
];
 
export default function Page() {
  const [ranking, setRanking] = useState(BOOKS);
 
  function move(index, direction) {
    const copy = [...ranking];
    const target = index + direction;
    if (target < 0 || target >= copy.length) return;
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setRanking(copy);
  }
 
  return (
    <main style={{ padding: 20 }}>
      <h1>📚 Book Club Vote</h1>
      <p>Rank the books from most to least excited to read.</p>
 
      {ranking.map((book, index) => (
        <div
          key={book.id}
          style={{
            display: 'flex',
            gap: 12,
            padding: 12,
            border: '1px solid #ddd',
            marginBottom: 10,
            borderRadius: 8
          }}
        >
          <img
            src={book.cover}
            alt={book.title}
            width={60}
            height={90}
            style={{ borderRadius: 4 }}
          />
 
          <div style={{ flex: 1 }}>
            <strong>#{index + 1} {book.title}</strong>
            <div>
              <a href={book.link} target="_blank">View on StoryGraph</a>
            </div>
          </div>
 
          <div>
            <button onClick={() => move(index, -1)}>↑</button>
            <br />
            <button onClick={() => move(index, 1)}>↓</button>
          </div>
        </div>
      ))}
 
      <button style={{ marginTop: 10 }}>Submit Vote</button>
    </main>
  );
}
