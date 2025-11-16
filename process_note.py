from db_connect import connect_db
from nlp_tools import summarize_text, generate_questions

def process_note(user_id, note_text):

    db = connect_db()
    cursor = db.cursor()

    # Add note into database
    cursor.execute(
        "INSERT INTO notes (user_id, title, file_path) VALUES (%s, %s, %s)",
        (user_id, "Uploaded Note", None)
    )
    note_id = cursor.lastrowid

    # NLP part
    summary = summarize_text(note_text)
    questions = generate_questions(summary)

    # Insert questions into DB
    for q in questions:
        question = q["question"]
        correct = q["answer"]

        cursor.execute("""
            INSERT INTO questions (note_id, question_text, correct_answer)
            VALUES (%s, %s, %s)
        """, (note_id, question, correct))

    db.commit()
    db.close()

    print("\nSUMMARY:\n", summary)
    print("\nQuestions saved:", len(questions))
    return note_id
