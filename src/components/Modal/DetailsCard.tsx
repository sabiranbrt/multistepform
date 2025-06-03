interface DynamicDetailsCardProps {
  title: string;
  data: Record<string, any>;
  fields?: string[];
  keyLabelMap?: Record<string, string>; // optional: label overrides
}

const formatKey = (key: string) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const DynamicDetailsCard = ({
  title,
  data,
  fields,
  keyLabelMap = {},
}: DynamicDetailsCardProps) => {
  const entries = fields
    ? fields.map((key) => [key, data[key]])
    : Object.entries(data);

  return (
    <div className="space-y-3 bg-gray-50 rounded-xl !p-2 w-full border-1 border-gray-300">
      <h2 className="text-sm font-medium text-gray-600">{title}</h2>
      {entries.map(([key, value]) => (
        <div key={key}>
          <p className="text-sm text-gray-500">
            {keyLabelMap[key] || formatKey(key)}
          </p>
          <p className="text-sm font-medium text-gray-800 capitalize">
            {value || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DynamicDetailsCard;
