export default function Filters({ status, onChange }) {
  return (
    <div className="mb-3">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-3 py-2"
      >
        <option value="all">All Todos</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
