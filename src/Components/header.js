export default function Header() {
    return (
        <div>
            <ul className="flex space-x-4">
                <li className="cursor-pointer bg-slate-600 text-white p-2"><a href="/">Estoque</a></li>
                <li className="cursor-pointer bg-slate-600 text-white p-2"><a href="/schedule">Agendamentos</a></li>
                <li className="cursor-pointer bg-slate-600 text-white p-2"><a href="/order">Vendas</a></li>
            </ul>
        </div>
    );
}   