import { Amplify } from 'aws-amplify';
import ToolsCreateForm from '../../ui-components/ToolsCreateForm';
import outputs from '../../amplify_outputs.json';
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function Tools_Page() {

  const [tools, setTools] = useState<Array<Schema["Tools"]["type"]>>([]);

  useEffect(() => {
    client.models.Tools.observeQuery().subscribe({
      next: (data) => setTools([...data.items]),
    });
  }, []);

  return (
    <div>
      <h1>Inv_Form</h1>
      <ToolsCreateForm />
      <ul>
        {tools.map((tool) => (
          <div>
            <li key={tool.id}>{tool.name}</li>
            <li>{tool.description}</li>
            <li>{tool.id}</li>
            <li>{tool.createdAt}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}