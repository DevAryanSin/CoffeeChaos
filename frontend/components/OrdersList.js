'use client';

export default function OrdersList({ orders }) {
    if (!orders || orders.length === 0) {
        return (
            <div className="card">
                <h2 className="text-2xl font-bold text-coffee-900 mb-4">Your Orders</h2>
                <p className="text-gray-600">No orders yet. Place your first order!</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h2 className="text-2xl font-bold text-coffee-900 mb-4">Your Orders</h2>
            <div className="space-y-3">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg text-coffee-800">
                                    {order.coffeeType}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Size: {order.size} | Sugar: {order.sugar}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(order.createdAt).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
