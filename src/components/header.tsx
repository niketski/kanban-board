interface HeaderProps {
    title: string;
}

function Header({ title } : HeaderProps) {
    return (
        <header className="px-[52px] py-[40px]">
            <h1 className="text-3xl font-bold">{ title }</h1>
        </header>
    );
}

export default Header