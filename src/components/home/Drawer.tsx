// Drawer.tsx
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define Bible book types
interface Book {
  id: string;
  name: string;
  testament: "old" | "new";
  chapters: number;
  verses: Record<number, number>;
}

// Bible data - currently just showing the 3 John books
const bibleBooks: Book[] = [
  {
    id: "1jn",
    name: "1 John",
    testament: "new",
    chapters: 5,
    verses: { 1: 10, 2: 29, 3: 24, 4: 21, 5: 21 }
  },
  {
    id: "2jn",
    name: "2 John",
    testament: "new",
    chapters: 1,
    verses: { 1: 13 }
  },
  {
    id: "3jn",
    name: "3 John",
    testament: "new",
    chapters: 1,
    verses: { 1: 15 }
  }
];

const Drawer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(bibleBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("books");

  // Filter books based on search query
  useEffect(() => {
    const filtered = bibleBooks.filter(book =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchQuery]);

  // Handle book selection
  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setSelectedVerse(null);
    setActiveTab("chapters"); // Auto-advance to chapters tab
  };

  // Handle chapter selection
  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setSelectedVerse(null);
    setActiveTab("verses"); // Auto-advance to verses tab
  };

  // Handle verse selection
  const handleVerseSelect = (verse: number) => {
    setSelectedVerse(verse);
    // Here you would typically trigger an action to display the verse content
  };

  // Get available verses for the selected chapter
  const getAvailableVerses = () => {
    if (!selectedBook || !selectedChapter) return [];
    const verseCount = selectedBook.verses[selectedChapter] || 0;
    return Array.from({ length: verseCount }, (_, i) => i + 1);
  };

  // Get available chapters for the selected book
  const getAvailableChapters = () => {
    if (!selectedBook) return [];
    return Array.from({ length: selectedBook.chapters }, (_, i) => i + 1);
  };

  // Group books by testament
  const groupedBooks = filteredBooks.reduce(
    (acc, book) => {
      acc[book.testament].push(book);
      return acc;
    },
    { old: [] as Book[], new: [] as Book[] }
  );

  // Render the search box
  const renderSearchBox = () => (
    <div className="relative mb-4">
      <Input
        type="text"
        placeholder="Search Books"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-12 rounded-md"
      />
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-0 top-0 h-full"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="h-full flex flex-col p-4">
      {/* Search Box */}
      {renderSearchBox()}

      {/* Selection Controls */}
            <div className="flex mb-4 space-x-2">
              <Select value={selectedBook?.id || ""} onValueChange={handleBookSelect}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Book" />
                </SelectTrigger>
                <SelectContent>
                  {filteredBooks.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
      
              <Select
                value={selectedChapter?.toString() || "1"}
                onValueChange={(value) => setSelectedChapter(parseInt(value))}
                disabled={!selectedBook}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Chapter" />
                </SelectTrigger>
                <SelectContent>
                  {selectedBook && Array.from({ length: selectedBook.chapters }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
      
              <Select
                value={selectedVerse?.toString() || "1"}
                onValueChange={(value) => setSelectedVerse(parseInt(value))}
                disabled={!selectedBook}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Verse" />
                </SelectTrigger>
                <SelectContent>
                  {selectedBook && selectedChapter && Array.from(
                    { length: selectedBook.verses[selectedChapter] || 0 },
                    (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
      
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={!selectedBook}
              >
                Go
              </Button>
            </div>

      {/* Bible Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="verses">Verses</TabsTrigger>
        </TabsList>
        
        {/* Books Tab */}
        <TabsContent value="books" className="flex-1 border rounded-lg p-4 mt-2 overflow-auto">
          <div className="grid grid-cols-2 h-full">
            <div className="border-r pr-2">
              <h3 className="font-bold mb-2 text-center">Old Testament</h3>
              <div className="flex flex-col space-y-1">
                {groupedBooks.old.map(book => (
                  <Button 
                    key={book.id}
                    variant="ghost"
                    className="justify-start text-left"
                    onClick={() => handleBookSelect(book)}
                  >
                    {book.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="pl-2">
              <h3 className="font-bold mb-2 text-center">New Testament</h3>
              <div className="flex flex-col space-y-1">
                {groupedBooks.new.map(book => (
                  <Button 
                    key={book.id}
                    variant="ghost"
                    className={`justify-start text-left ${book.id === '3jn' ? 'text-green-500' : ''}`}
                    onClick={() => handleBookSelect(book)}
                  >
                    {book.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Chapters Tab */}
        <TabsContent value="chapters" className="flex-1 border rounded-lg p-4 mt-2 overflow-auto">
          <div className="grid grid-cols-5 gap-2">
            {getAvailableChapters().map(chapter => (
              <Button 
                key={chapter}
                variant="outline"
                className={`h-12 ${chapter === 1 ? 'text-green-500 border-green-500' : ''}`}
                onClick={() => handleChapterSelect(chapter)}
              >
                {chapter}
              </Button>
            ))}
          </div>
        </TabsContent>

        {/* Verses Tab */}
        <TabsContent value="verses" className="flex-1 border rounded-lg p-4 mt-2 overflow-auto">
          <div className="grid grid-cols-5 gap-2">
            {getAvailableVerses().map(verse => (
              <Button 
                key={verse}
                variant="outline"
                className="h-12"
                onClick={() => handleVerseSelect(verse)}
              >
                {verse}
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Drawer;