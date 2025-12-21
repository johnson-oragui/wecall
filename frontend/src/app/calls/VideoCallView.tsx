import { Video, Mic, Phone } from 'lucide-react';

// Interface for an active Video Call

const VideoCallView: React.FC = () => (
	<div className="flex flex-col items-center justify-center w-full h-full p-8 bg-black">
		<Video className="h-16 w-16 text-indigo-400 mb-4 animate-pulse" />
		<h3 className="text-xl font-semibold text-white">Active Video Call</h3>
		<p className="text-gray-400">Connecting crystal-clear video stream...</p>
		<div className="mt-8 flex space-x-4">
			<button className="p-3 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-xl transform hover:scale-105 transition">
				<Phone className="h-6 w-6 rotate-135" />
			</button>
			<button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white shadow-xl transform hover:scale-105 transition">
				<Mic className="h-6 w-6" />
			</button>
			<button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white shadow-xl transform hover:scale-105 transition">
				<Video className="h-6 w-6" />
			</button>
		</div>
	</div>
);

export default VideoCallView;
