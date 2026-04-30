'use client';
 
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
 
const supabase = createClient(
  'https://ecxovcobuaacduvisydv.supabase.co',
  'sb_publishable_O39lSYIcnMP-AjD2y7uh0Q_QpkIob9I'
);
 
// 🔁 Change monthly
const POLL_ID = '2026-05-book-club';
 
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
  },
  {
    id: 4,
    title: 'Book Four',
    cover: 'https://covers.openlibrary.org/b/id/9876543-L.jpg',
    link: 'https://app.thestorygraph.com'
  },
  {
    id: 5,
    title: 'Book Five',
    cover: 'https://covers.openlibrary.org/b/id/8765432-L.jpg',
    link: 'https://app.thestorygraph.com'
  },
  {
    id: 6,
    title: 'Book Six',
    cover: 'https://covers.openlibrary.org/b/id/7654321-L.jpg',
    link: 'https://app.thestorygraph.com'
  },
  {
    id: 7,
    title: 'Book Seven',
    cover: 'https://covers.openlibrary.org/b/id/6543210-L.jpg',
    link: 'https://app.thestorygraph.com'
  },
  {
    id: 8,
    title: 'Book Eight',
    cover: 'https://covers.openlibrary.org/b/id/5432109-L.jpg',
    link: 'https://app.thestorygraph.com'
  }
];
 
export default function Page() {
  const [ranking, setRanking] = useState(BOOKS);
  const [results, setResults] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
 
  useEffect(() => {
    loadResults();
  }, []);
 
  function move(index, direction) {
    const copy = [...ranking];
    const target = index + direction;
    if (target < 0 || target >= copy.length) return;
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setRanking(copy);
  }
 
  async function submitVote() {
    const rows = ranking.map((book, index) => ({
      poll_id: POLL_ID,
      book_id: book.id,
      rank: index + 1
    }));
 
    const { error } = await supabase.from('votes').insert(rows);
    if (error) {
      alert('Error saving vote');
      console.error(error);
      return;
    }
 
    await loadResults();
    alert('Vote saved ✅');
  }
 
  async function loadResults() {
    const { data } = await supabase
      .from('votes')
      .select('book_id, rank')
      .eq('poll_id', POLL_ID);
 
    const tally = {};
    data?.forEach(v => {
      tally[v.book_id] =
        (tally[v.book_id] || 0) + (BOOKS.length - v.rank + 1);
    });
 
    setResults(tally);
    setTotalVotes(data?.length || 0);
  }
 
  const sortedResults = [...BOOKS]
    .map(b => ({ ...b, score: results[b.id] || 0 }))
    .sort((a, b) => b.score - a.score);
 
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
            borderRadius: 8,
            alignItems: 'center'
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
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                View on StoryGraph
              </a>
            </div>
          </div>
 
          <div>
            <button onClick={() => move(index, -1)}>↑</button><br />
            <button onClick={() => move(index, 1)}>↓</button>
          </div>
        </div>
      ))}
 
      <button onClick={submitVote}>Submit Vote</button>
 
      <hr />
 
      <h2>📊 Live Results</h2>
      <div>Total votes: {totalVotes}</div>
      {sortedResults.map((b, i) => (
        <div key={b.id}>
          {i + 1}. {b.title} — {b.score} pts
        </div>
      ))}
    </main>
  );
}
``
