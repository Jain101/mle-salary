# import pandas as pd
# from langchain.llms import OpenAI
# from langchain.prompts import PromptTemplate
# from langchain.chains import LLMChain
# from dotenv import load_dotenv
# import os
# from flask import Flask, request, jsonify

# # Set your OpenAI API key

# load_dotenv()

# OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

# # Data
# data = [
#     {"year": 2024, "location": "MI", "employment_type": "FT", "role": "Data Scientist", "salary": 120000, "currency": "USD", "equity": 120000, "country": "AU", "remote_ratio": 0, "office_country": "AU", "gender": "S"},
#     {"year": 2024, "location": "MI", "employment_type": "FT", "role": "Data Scientist", "salary": 70000, "currency": "USD", "equity": 70000, "country": "AU", "remote_ratio": 0, "office_country": "AU", "gender": "S"},
#     {"year": 2024, "location": "MI", "employment_type": "CT", "role": "Data Scientist", "salary": 130000, "currency": "USD", "equity": 130000, "country": "US", "remote_ratio": 0, "office_country": "US", "gender": "M"},
#     {"year": 2024, "location": "MI", "employment_type": "CT", "role": "Data Scientist", "salary": 110000, "currency": "USD", "equity": 110000, "country": "US", "remote_ratio": 0, "office_country": "US", "gender": "M"},
#     {"year": 2024, "location": "MI", "employment_type": "FT", "role": "Data Science Manager", "salary": 240000, "currency": "USD", "equity": 240000, "country": "US", "remote_ratio": 0, "office_country": "US", "gender": "M"},
#     {"year": 2024, "location": "MI", "employment_type": "FT", "role": "Data Science Manager", "salary": 180000, "currency": "USD", "equity": 180000, "country": "US", "remote_ratio": 0, "office_country": "US", "gender": "M"},
#     {"year": 2024, "location": "SE", "employment_type": "FT", "role": "Business Intelligence Engineer", "salary": 202800, "currency": "USD", "equity": 202800, "country": "US", "remote_ratio": 0, "office_country": "US", "gender": "M"},
#     {"year": 2024, "location": "SE", "employment_type": "FT", "role": "Business Intelligence Engineer", "salary": 115000, "currency": "USD", "equity": 115000, "country": "US", "remote_ratio": 0, "office_country": "US", "gender": "M"}
# ]

# df = pd.DataFrame(data)

# # Prompt template
# template = """
# You are a helpful assistant with access to business data. Here is the data you have:

# {data}

# Based on this data, answer the following question:

# Question: {question}

# Answer:
# """

# prompt = PromptTemplate(input_variables=["data", "question"], template=template)

# # LLM Chain
# llm = OpenAI(model="text-davinci-003")
# chain = LLMChain(llm=llm, prompt=prompt)

# # Function to generate response
# def generate_response(question):
#     data_str = df.to_string(index=False)
#     response = chain.run({"data": data_str, "question": question})
#     return response

# # Flask app
# app = Flask(__name__)

# @app.route('/ask', methods=['POST'])
# def ask():
#     data = request.get_json()
#     question = data.get('question')
#     if not question:
#         return jsonify({'error': 'No question provided'}), 400
    
#     response = generate_response(question)
#     return jsonify({'response': response})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)


from langchain_experimental.agents import create_csv_agent
from langchain.llms import OpenAI
from dotenv import load_dotenv
import os
import streamlit as st


def main():
    load_dotenv()

    # Load the OpenAI API key from the environment variable
    if os.getenv("OPENAI_API_KEY") is None or os.getenv("OPENAI_API_KEY") == "":
        print("OPENAI_API_KEY is not set")
        exit(1)
    else:
        print("OPENAI_API_KEY is set")

    st.set_page_config(page_title="Ask your CSV")
    st.header("Ask your CSV 📈")

    csv_file = st.file_uploader("Upload a CSV file", type="csv")
    if csv_file is not None:
        agent = create_csv_agent(OpenAI(temperature=0), csv_file, verbose=True)
        user_question = st.text_input("Ask a question about your CSV: ")
        if user_question is not None and user_question != "":
            with st.spinner(text="In progress..."):
                st.write(agent.run(user_question))

if __name__ == "__main__":
    main()