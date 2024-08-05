function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div>
                    <h5 className="text-sm">©️ {new Date().getFullYear()} Coursera</h5>
                </div>
                <div>
                    <h5 className="text-sm">All rights reserved</h5>
                </div>
            </div>
        </footer>
    );
}

export default Footer;