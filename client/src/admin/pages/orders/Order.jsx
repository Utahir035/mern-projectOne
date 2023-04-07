import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import OrderTable from "../../components/ordertable/OrderTable";
const Order = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <OrderTable />
      </div>
    </div>
  );
};

export default Order;
