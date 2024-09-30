from langchain.chains.query_constructor.base import AttributeInfo

Metadata_field_info = [
    AttributeInfo(
        name="cik",
        description="Company ID.",
        type=""
    ),    
    AttributeInfo(
        name="company_name",
        description="Name of the company.",
        type=""
    ),    
    AttributeInfo(
        name="html_url",
        description="The URL of the html file containing the information about the company.",
        type=""
    ),
    AttributeInfo(
        name="page_number",
        description="The page number of the html file containing the information about the company.",
        type="string"
    ),
]

Document_content_description = 'Information about the company.'
