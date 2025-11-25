'use client';

export default function Leaderboard({ leaderboard }) {
    if (!leaderboard || leaderboard.length === 0) {
        return (
            <div className="card">
                <h2 className="text-2xl font-bold text-coffee-900 mb-4">🏆 Leaderboard</h2>
                <p className="text-gray-600">No data available yet.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h2 className="text-2xl font-bold text-coffee-900 mb-4">🏆 Leaderboard</h2>
            <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                    <div
                        key={entry.username}
                        className={`flex justify-between items-center p-3 rounded-lg ${index === 0 ? 'bg-yellow-100 border-2 border-yellow-400' :
                                index === 1 ? 'bg-gray-100 border-2 border-gray-400' :
                                    index === 2 ? 'bg-orange-100 border-2 border-orange-400' :
                                        'bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-coffee-800 w-8">
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${entry.rank}`}
                            </span>
                            <span className="font-semibold text-gray-800">{entry.username}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-coffee-700 font-bold">{entry.totalCups}</span>
                            <span className="text-sm text-gray-600 ml-1">cups</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
