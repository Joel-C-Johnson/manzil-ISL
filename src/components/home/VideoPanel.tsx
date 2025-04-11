// VideoPanel.tsx
import { useState } from "react";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPanelProps {
  book?: string;
  chapter?: number;
  verse?: number;
}

const VideoPanel = ({ book = "3jn", chapter = 1, verse = 1 }: VideoPanelProps) => {
  // State to track video progress and loading
  const [isLoading, setIsLoading] = useState(false);
  
  // Navigate to previous or next verse/chapter
  const navigateToPrevVerse = () => {
    console.log("Navigate to previous verse");
    // Implementation would depend on your application state management
  };
  
  const navigateToNextVerse = () => {
    console.log("Navigate to next verse");
    // Implementation would depend on your application state management
  };
  
  const navigateToPrevChapter = () => {
    console.log("Navigate to previous chapter");
    // Implementation would depend on your application state management
  };
  
  const navigateToNextChapter = () => {
    console.log("Navigate to next chapter");
    // Implementation would depend on your application state management
  };
  
  const handleShare = () => {
    console.log("Share functionality");
    // Implementation for sharing feature
  };
  
  const handleDownload = () => {
    console.log("Download functionality");
    // Implementation for download feature
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Navigation Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="text-blue-500 border-blue-500"
            onClick={navigateToPrevVerse}
          >
            previous verse
          </Button>
          <Button 
            variant="outline" 
            className="text-blue-500 border-blue-500"
            onClick={navigateToPrevChapter}
          >
            previous verse
          </Button>
        </div>
        
        <div className="font-medium text-lg">
          {book} {chapter} : {verse}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="text-blue-500 border-blue-500"
            onClick={navigateToNextVerse}
          >
            next verse
          </Button>
          <Button 
            variant="outline" 
            className="text-blue-500 border-blue-500"
            onClick={navigateToNextChapter}
          >
            next chapter
          </Button>
        </div>
      </div>
      
      {/* Video Container */}
      <div className="flex-1 border rounded-lg overflow-hidden mb-4 relative">
        <iframe
          src="https://www.youtube.com/embed/Z0I6ontpqSQ"
          title="Bible Video"
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        )}
      </div>
      
      {/* Attribution and Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img 
              src="/api/placeholder/32/32" 
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm">Translated by: © Indian Holy Bible | Quality-checked by church</span>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;