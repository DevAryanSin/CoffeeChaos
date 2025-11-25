import './globals.css'

export const metadata = {
    title: 'Brewster Buster - Coffee Ordering',
    description: 'Order your favorite coffee with Brewster Buster',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
