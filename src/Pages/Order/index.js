import { useEffect, useState } from "react";
import supabase from "../../supabase";
import Alert from "../../Components/UI/alert";

export default function Order() {
  const [products, setProducts] = useState([]); // Produtos disponíveis
  const [users, setUsers] = useState([]); // Lista de usuários
  const [sales, setSales] = useState([]); // Lista de vendas
  const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado
  const [selectedProduct, setSelectedProduct] = useState(null); // Produto selecionado
  const [quantity, setQuantity] = useState(1); // Quantidade do produto

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const fetchSales = async () => {
    try {
      const { data, error } = await supabase.from("sales").select("*");
      if (error) throw error;
      setSales(data || []);
    } catch (error) {
      console.error("Error fetching sales:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchSales();
  }, []);

  const createSale = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("Por favor, selecione um usuário.");
      return;
    }
    if (!selectedProduct || quantity <= 0) {
      alert("Por favor, selecione um produto e informe uma quantidade válida.");
      return;
    }

    try {
      // Verificar o estoque do produto selecionado
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("stock")
        .eq("id", selectedProduct)
        .single();

      if (productError) throw productError;

      if (!productData || productData.stock < quantity) {
        alert("Estoque insuficiente para este produto.");
        return;
      }

      // Passo 1: Criar a venda
      const { data: saleData, error: saleError } = await supabase
        .from("sales")
        .insert([
          {
            customer_name: users.find((u) => u.id === parseInt(selectedUser)).name,
            total_price: 100, // Ajuste o total_price conforme necessário
          },
        ])
        .select();

      if (saleError) throw saleError;

      const saleId = saleData[0].id;

      // Passo 2: Adicionar o item da venda
      const { data: saleItemData, error: saleItemError } = await supabase
        .from("sales_items")
        .insert([
          {
            sale_id: saleId,
            product_id: selectedProduct,
            quantity: quantity,
          },
        ])
        .select();

      if (saleItemError) throw saleItemError;

      console.log("Venda criada com sucesso:", saleData, saleItemData);

      // Atualizar a lista de vendas
      fetchSales();
    } catch (error) {
      alert(`Erro ao criar a venda: ${error.message}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendas</h1>

      {/* Formulário de venda */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        onSubmit={createSale}
      >
        {/* Seleção de usuário */}
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Selecione um usuário</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {/* Seleção de produto */}
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        {/* Quantidade */}
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded"
          placeholder="Quantidade"
        />

        {/* Botão de venda */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Vender
        </button>
      </form>

      {/* Listar vendas */}
      <div className="mt-6">
        <h2 className="font-bold text-lg">Listar Vendas</h2>
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col gap-2"
          >
            <p>Nome do Cliente: {sale.customer_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
