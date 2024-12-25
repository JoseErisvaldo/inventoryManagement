import { useEffect, useState } from "react";
import supabase from "../../supabase";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    product_id: "",
    quantity: 0
  });
  const [productData, setProductData] = useState({});

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase.from("appointments").select("*");
      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching Appointments:", error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      setProductData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAppointments()
  }, []);

  const createAppointment = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .insert([appointmentData]);
      if (error) throw error;
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating Appointment:", error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agendamentos</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
      >
        Criar Agendamento
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Criar Novo Agendamento</h2>
            <select
              className="w-full px-3 py-2 mb-4 border rounded-md"
              value={appointmentData.product_id}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  product_id: e.target.value
                })
              }
            >
              <option value="">Selecione um produto</option>
              {productData.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantidade"
              className="w-full px-3 py-2 mb-4 border rounded-md"
              value={appointmentData.quantity}
              onChange={(e) =>
                setAppointmentData({ ...appointmentData, quantity: e.target.value })
              }
            />
            <div className="flex justify-between">
              <button
                onClick={createAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Criar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col gap-2"
          >
            <p className="text-lg font-semibold">Agendamento: {appointment.id}</p>
            <p className="text-lg font-semibold">ID produto: {appointment.product_id}</p>
            <p className="text-sm text-gray-500">Quantidade: {appointment.quantity}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}
