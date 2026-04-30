'use client';
 
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
 
const supabase = createClient(
  'https://ecxovcobuaacduvisydv.supabase.co',
  'sb_publishable_O39lSYIcnMP-AjD2y7uh0Q_QpkIob9I'
);
 
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
