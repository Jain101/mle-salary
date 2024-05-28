import { ChatGroq } from '@langchain/groq'
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
import { DataSource } from 'typeorm';

const model = new ChatGroq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    maxTokens: 1000,
});

export const runAgent1 = async (input) => {
    console.log('runnning1');
    const datasource = new DataSource({
        type: 'sqlite',
        database: '../../public/test.db',
    })
    console.log('runnning2', datasource);
    const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
        includesTables: ['employees']
    });

    const toolkit = new SqlToolkit(db, model);
    const executor = createSqlAgent(model, toolkit, { topK: 16494 });
    //const input = `how many jobs are there in the year 2020`;
    console.log(`Executing with input "${input}"...`);
    const result = await executor.invoke({ input });
    // console.log(`Got output ${result.output}`);
    // console.log(
    //     `Got intermediate steps ${JSON.stringify(
    //         result.intermediateSteps,
    //         null,
    //         2
    //     )}`
    // );
    return result.output
}

