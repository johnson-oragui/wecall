import { VoiceCallViewProps } from '@/src/types/callTypes';
import { Mic, Phone, Minus } from 'lucide-react';
import React from 'react';

//  Interface for an active Voice Call
const VoiceCallView: React.FC<VoiceCallViewProps> = React.memo(
	({ partnerName }) => (
		<div className="flex flex-col items-center justify-center w-full h-full p-8 bg-gray-900">
			<Mic className="h-16 w-16 text-purple-400 mb-4 animate-bounce" />
			<h3 className="text-xl font-semibold text-white">Active Voice Call</h3>
			<p className="text-gray-400">
				You are currently speaking with {partnerName}.
			</p>
			<div className="mt-8 flex space-x-4">
				<button className="p-3 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-xl transform hover:scale-105 transition">
					<Phone className="h-6 w-6 rotate-135" />
				</button>
				<button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white shadow-xl transform hover:scale-105 transition">
					<Minus className="h-6 w-6" />
				</button>
			</div>
		</div>
	),
);
VoiceCallView.displayName = 'VoiceCallView';

export default VoiceCallView;
