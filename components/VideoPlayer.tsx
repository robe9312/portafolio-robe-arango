
import React from 'react';
import type { VideoWork } from '../types';

interface VideoPlayerProps {
    video: VideoWork;
    index: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, index }) => {
    return (
        <div 
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4"
            style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0 }}
        >
            <div className="aspect-w-16 aspect-h-9">
                <iframe 
                    src={video.embedUrl}
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full rounded-md"
                ></iframe>
            </div>
            <div className="pt-4">
                <h3 className="text-xl font-bold text-amber-400">{video.title}</h3>
                <p className="text-gray-400 mt-1">{video.year} &bull; {video.duration}</p>
                <p className="text-gray-300 mt-3 text-sm">{video.description}</p>
            </div>
        </div>
    );
};

export default VideoPlayer;