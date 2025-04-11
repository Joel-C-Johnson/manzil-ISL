import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import bibleBooksData from "@/assets/books"; // Assuming you have a bibleBooks data file

// Define Bible book types
interface Book {
  id: string;
  name: string;
  testament: string;
  chapters: number;
  verses: Record<number, number>;
}

// Bible data
const bibleBooks: Book[] = bibleBooksData as Book[];

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
    <div className="relative mb-6">
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
    <div className="p-4">

      {renderSearchBox()}

      <div className="flex mb-6 space-x-2">
        <Select value={selectedBook?.id || ""} onValueChange={(id) => {
          const book = bibleBooks.find(b => b.id === id);
          if (book) handleBookSelect(book);
        }}>
          <SelectTrigger className="w-32">
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
          value={selectedChapter?.toString() || ""}
          onValueChange={(value) => handleChapterSelect(parseInt(value))}
          disabled={!selectedBook}
        >
          <SelectTrigger className="w-20">
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
          value={selectedVerse?.toString() || ""}
          onValueChange={(value) => setSelectedVerse(parseInt(value))}
          disabled={!selectedBook || !selectedChapter}
        >
          <SelectTrigger className="w-20">
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
          className="bg-blue-500 hover:bg-blue-600 text-white"
          disabled={!selectedBook}
        >
          Go
        </Button>
      </div>

      {/* Bible Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="verses">Verses</TabsTrigger>
        </TabsList>
        
        {/* Books Tab  */}
        <TabsContent value="books" className="overflow-y-auto max-h-160 [&::-webkit-scrollbar]:hidden border-2 rounded-lg">
          <div className="p-4">
            
            <h2 className="text-l font-bold text-center mb-2 text-blue-800">Old Testament</h2>
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {groupedBooks.old.map(book => (
                <Button 
                  key={book.id}
                  variant="outline"
                  className={`h-10  hover:bg-blue-100 ${selectedBook === book ? 'bg-blue-200' : ''}`}
                  onClick={() => handleBookSelect(book)}
                >
                  {book.name}
                </Button>
              ))}
            </div>

            <h2 className="text-l font-bold text-center mb-2 text-blue-800">New Testament</h2>
            <div className="grid grid-cols-2 gap-1.5">
              {groupedBooks.new.map(book => (
                <Button 
                  key={book.id}
                  variant="outline"
                  className="h-10 hover:bg-blue-100"
                  onClick={() => handleBookSelect(book)}
                >
                  {book.name}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Chapters Tab */}
        <TabsContent value="chapters" className="overflow-y-auto max-h-160 [&::-webkit-scrollbar]:hidden border-2 rounded-lg p-4">
          <div className="grid grid-cols-5 gap-2">
            {getAvailableChapters().map(chapter => (
              <Button 
                key={chapter}
                variant="outline"
                // h-10 rounded-md text-center justify-center bg-blue-100 hover:bg-blue-200
                className={`h-10  hover:bg-blue-100 ${selectedChapter === chapter ? 'bg-blue-200' : ''}`}
                onClick={() => handleChapterSelect(chapter)}
              >
                {chapter}
              </Button>
            ))}
          </div>
        </TabsContent>

        {/* Verses Tab */}
        <TabsContent value="verses" className="overflow-y-auto max-h-160 [&::-webkit-scrollbar]:hidden border-2 rounded-lg p-4">
          <div className="grid grid-cols-5 gap-2">
            {getAvailableVerses().map(verse => (
              <Button 
                key={verse}
                variant="outline"
                className={`h-12  hover:bg-blue-100 ${selectedVerse === verse ? 'bg-blue-200' : ''}`}
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