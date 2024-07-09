interface HeaderProps {
    title: string;
}

export default function Header({ title } : HeaderProps) {
    return (
        <header className="px-[15px] py-[40px]">
            <h1 className="text-3xl font-bold">{ title }</h1>
        </header>
    );
}