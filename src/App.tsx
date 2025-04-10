import { useState } from "react";
import Header from "./components/home/Header";
import Drawer from "./components/home/Drawer";
import { Sheet, SheetContent } from "./components/ui/sheet";
import VideoPanel from "./components/home/VideoPanel";

const VerseDisplay = () => {
  return (
    <div className="h-full overflow-y-auto max-h-[calc(100vh-64px)] [&::-webkit-scrollbar]:hidden p-4">
      <div className="space-y-4">
        <h2 className="text-center text-lg font-bold ">3 John 1-9</h2>
        <hr className="my-4" />
        <p>
          <strong>1</strong> The elder, To my dear friend Gaius, whom I love in
          the truth.
        </p>
        <hr className="my-4" />
        <p>
          <strong>2</strong> Dear friend, I pray that you may enjoy good health
          and that all may go well with you, even as your soul is getting along
          well.
        </p>

        <hr className="my-4" />
        <p>
          <strong>3</strong> It gave me great joy when some believers came and
          testified about your faithfulness to the truth, telling how you
          continue to walk in it.
        </p>
        <hr className="my-4" />
        <p>
          <strong>4</strong> I have no greater joy than to hear that my children
          are walking in the truth.
        </p>
        <hr className="my-4" />
        <p>
          <strong>5</strong> Dear friend, you are faithful in what you are doing
          for the brothers and sisters, even though they are strangers to you.
        </p>
        <hr className="my-4" />
        <p>
          <strong>6</strong> They have told the church about your love. Please
          send them on their way in a manner that honors God.
        </p>
        <hr className="my-4" />
        <p>
          <strong>7</strong> It was for the sake of the Name that they went out,
          receiving no help from the pagans.
        </p>
        <hr className="my-4" />
        <p>
          <strong>8</strong> We ought therefore to show hospitality to such
          people so that we may work together for the truth.
        </p>
        <hr className="my-4" />
        <p>
          <strong>9</strong> I wrote to the church, but Diotrephes, who loves to
          be first, will not welcome us.
        </p>
      </div>
    </div>
  );
};
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showingVerse, setShowingVerse] = useState(false);

  const handleMenuClick = () => {
    setIsDrawerOpen(true);
  };

  const toggleVerseDisplay = () => {
    setShowingVerse(!showingVerse);
  };
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header
        onMenuClick={handleMenuClick}
        onShowVerseClick={toggleVerseDisplay}
        showingVerse={showingVerse}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block w-96 border-r">
          {showingVerse ? <VerseDisplay /> : <Drawer />}
        </div>

        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent side="left" className="w-full sm:w-64 pt-10">
            {showingVerse ? <VerseDisplay /> : <Drawer />}
          </SheetContent>
        </Sheet>

        <div className="flex-1">
          <VideoPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
