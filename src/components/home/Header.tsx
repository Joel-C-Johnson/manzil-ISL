import { BookOpen, Menu } from "lucide-react";
import { Button } from "../ui/button";

const Header = ({ onMenuClick, onShowVerseClick, showingVerse }: { 
  onMenuClick: () => void, 
  onShowVerseClick: () => void,
  showingVerse: boolean
}) => {
  return (
    <header className="w-full border-b p-4 shadow-sm flex items-center justify-between">
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <h1 className="text-xl font-bold text-center flex-grow">Manzil-ISL</h1>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onShowVerseClick}
        className="flex items-center"
      >
        <BookOpen className="h-4 w-4 mr-1" />
        {showingVerse ? "Hide Verse" : "Show Verse"}
      </Button>
    </header>
  );
};

export default Header;
