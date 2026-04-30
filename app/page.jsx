import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
 
// ==== EDIT THESE BOOKS FOR EACH MONTH'S POLL ====
const initialBooks = [
  { id: 1, title: "Book One", cover: "https://covers.openlibrary.org/b/id/8231996-L.jpg", link: "https://app.thestorygraph.com/books/example1" },
  { id: 2, title: "Book Two", cover: "https://covers.openlibrary.org/b/id/10523338-L.jpg", link: "https://app.thestorygraph.com/books/example2" },
  { id: 3, title: "Book Three", cover: "https://covers.openlibrary.org/b/id/10909258-L.jpg", link: "https://app.thestorygraph.com/books/example3" },
  { id: 4, title: "Book Four", cover: "https://covers.openlibrary.org/b/id/9876543-L.jpg", link: "https://app.thestorygraph.com/books/example4" },
  { id: 5, title: "Book Five", cover: "https://covers.openlibrary.org/b/id/8765432-L.jpg", link: "https://app.thestorygraph.com/books/example5" },
  { id: 6, title: "Book Six", cover: "https://covers.openlibrary.org/b/id/7654321-L.jpg", link: "https://app.thestorygraph.com/books/example6" },
  { id: 7, title: "Book Seven", cover: "https://covers.openlibrary.org/b/id/6543210-L.jpg", link: "https://app.thestorygraph.com/books/example7" },
  { id: 8, title: "Book Eight", cover: "https://covers.openlibrary.org/b/id/5432109-L.jpg", link: "https://app.thestorygraph.com/books/example8" },
];
 
export default function BookClubVotingApp() {
  const [ranking, setRanking] = useState(initialBooks);
  const [results, setResults] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
 
  const move = (index, direction) => {
    const newRanking = [...ranking];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= ranking.length) return;
    [newRanking[index], newRanking[targetIndex]] = [newRanking[targetIndex], newRanking[index]];
    setRanking(newRanking);
  };
 
  const submitVote = () => {
    const newResults = { ...results };
    ranking.forEach((book, index) => {
      const score = ranking.length - index; // higher rank = higher score
      newResults[book.id] = (newResults[book.id] || 0) + score;
    });
    setResults(newResults);
    setTotalVotes(totalVotes + 1);
    alert("Your vote has been counted!");
  };
 
  const sortedResults = [...initialBooks]
    .map((book) => ({
      ...book,
      score: results[book.id] || 0,
    }))
    .sort((a, b) => b.score - a.score);
 
  return (
    <div className="min-h-screen bg-gray-50 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-center">Book Club Monthly Vote</h1>
      <p className="text-center mb-6 text-gray-600">
        Rank the books from most to least excited to read.
      </p>
 
      {ranking.map((book, index) => (
        <motion.div key={book.id} layout>
          <Card className="mb-4 rounded-2xl shadow">
            <CardContent className="flex gap-4 items-center p-4">
              <img src={book.cover} alt={book.title} className="w-20 h-28 object-cover rounded-xl" />
              <div className="flex-1">
                <h2 className="font-semibold">#{index + 1} {book.title}</h2>
                <a href={book.link} target="_blank" className="text-sm text-blue-600 underline">
                  View on StoryGraph
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" onClick={() => move(index, -1)}>↑</Button>
                <Button size="sm" onClick={() => move(index, 1)}>↓</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
 
      <Button className="w-full mt-4" onClick={submitVote}>Submit Vote</Button>
 
      {/* ==== LIVE RESULTS ==== */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 text-center">Live Results</h2>
        <p className="text-xs text-center text-gray-500 mb-4">Total votes: {totalVotes}</p>
        {sortedResults.map((book, index) => (
          <div key={book.id} className="flex items-center mb-2">
            <div className="flex-1">#{index + 1} {book.title}</div>
            <div className="font-semibold">{book.score} pts</div>
          </div>
        ))}
      </div>
 
      <p className="text-xs text-gray-500 mt-6 text-center">
        Public voting • Mobile friendly • New poll each month
      </p>
    </div>
  );
}
