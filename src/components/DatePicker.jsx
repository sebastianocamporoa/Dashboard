import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ setDate, date, placeholder }) => {
  return (
    <div>
      <ReactDatePicker
        selected={date}
        onChange={(update) => setDate(update)}
        className="p-1 rounded-2 border-1 datePicker"
        placeholderText={placeholder}
        withPortal
      />
    </div>
  );
};

export default DatePicker;
