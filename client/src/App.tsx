import GunplaBacklog from './features/Builds/components/Build';
import Download from './features/Download/components/Download';

function App() {
  return (
    <div className="container m-auto">
      <div className="flex flex-row gap-4 justify-between items-center mt-8">
        <h2 className="text-3xl text-white font-bold">The Backlogs</h2>
        <Download />
      </div>
      <GunplaBacklog />
    </div>
  );
}

export default App;
