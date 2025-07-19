import React, { useState, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ArrowLeft } from 'phosphor-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PublishButton from './PublishButton';
import axios from 'axios';
import { marked } from 'marked';
import { AuthContext } from '../../context/authContext';

function BlogMaker() {
  const location = useLocation();
  const navigate = useNavigate();
  const editBlog = location.state?.blog;

  const [title, setTitle] = useState(editBlog?.title || '');
  const [content, setContent] = useState(editBlog?.content || '');

  const { currentUser, updatePlan } = useContext(AuthContext);

  const API_KEY_URL = 'AIzaSyAp2npRnRiviJpxeawCAjCDJ7SCUqD-f38';

  const isSameWeek = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const week1 = Math.ceil((((d1 - new Date(d1.getFullYear(), 0, 1)) / 86400000) + d1.getDay() + 1) / 7);
    const week2 = Math.ceil((((d2 - new Date(d2.getFullYear(), 0, 1)) / 86400000) + d2.getDay() + 1) / 7);
    return week1 === week2 && d1.getFullYear() === d2.getFullYear();
  };

  const apiUrl = async () => {
    const now = new Date();

    // Normalize user role
    let role = currentUser?.role || 'normal';
    if (role === 'normal') role = 'free';

    const aiUses = currentUser?.aiUses || 0;
    const lastUsed = currentUser?.lastUsed ? new Date(currentUser.lastUsed) : null;
    const premiumExpiry = currentUser?.premiumExpiry ? new Date(currentUser.premiumExpiry) : null;

    // FREE USERS (normal)
    if (role === 'free') {
      alert('AI features are only available for Medium or Premium users. Please subscribe.');
      navigate('/subscribe');
      return;
    }

    // PREMIUM EXPIRED
    if (role === 'premium' && premiumExpiry && now > premiumExpiry) {
      alert('Your Premium plan has expired. You have been downgraded to Free.');
      updatePlan('normal'); // downgrade
      navigate('/subscribe');
      return;
    }

    // MEDIUM PLAN CHECKS
    if (role === 'medium') {
      if (lastUsed && isSameWeek(lastUsed, now) && aiUses >= 1) {
        alert('You have already used AI this week. Upgrade to Premium for unlimited access.');
        return;
      }

      if (title.trim().split(/\s+/).length > 200) {
        alert('Medium plan allows prompts up to 200 words.');
        return;
      }

      // Update AI usage in localStorage (simulate backend)
      const updatedUser = {
        ...currentUser,
        aiUses: isSameWeek(lastUsed, now) ? aiUses + 1 : 1,
        lastUsed: now,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }

    // AI PROMPT GENERATION
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY_URL}`;

    const prompt = `
You are a professional blog writer. Write a compelling, fully polished blog post with the title: **"${title}"**

### Guidelines:
- Use professional markdown syntax.
- Follow the structure below.
- Each section must include **rich content**, **examples**, and **engaging storytelling**.
- The tone should be friendly, informative, and immersive — suitable for a tech-savvy audience or blog readers.
- The final output should be ready to publish as-is (no edits needed).
- Use **line breaks** between all headings and sections.

### Structure to Follow:

## ${title}

### Introduction

Write a vivid, engaging 4–6 sentence introduction that sets the tone and makes the reader curious.

### Key Point 1: [Insert Descriptive Subheading Here]

Write 2–3 rich paragraphs explaining this key point. 
Include:
- Real-world context or data
- Specific examples
- Emotional or cultural resonance if applicable

### Key Point 2: [Insert Descriptive Subheading Here]

Continue with another 2–3 paragraphs, providing in-depth explanation.
Include:
- Lists if needed
- Comparisons or anecdotes
- Emotional or sensory language to bring the topic to life

### Optional Key Point 3: [If Applicable]

(If the topic warrants a third section, add it. Otherwise, skip.)

### Conclusion

Wrap up with 3–4 sentences that summarize the blog, inspire reflection, or call to action.

Make sure everything is well-formatted, easy to read, and in markdown.
`;

    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiText) {
        const cleanBlogMarkdown = (text) => {
          return text
            .replace(/(#+ .+)/g, '\n$1\n') // newline around headings
            .replace(/\n{3,}/g, '\n\n')    // clean excessive newlines
            .trim();
        };

        const cleanedText = cleanBlogMarkdown(aiText);
        const htmlContent = marked.parse(cleanedText);
        setContent(htmlContent);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/blog-view"
        className="flex items-center text-gray-600 hover:text-black transition duration-200 mb-8"
      >
        <ArrowLeft size={24} weight="bold" className="mr-2" />
        <span className="text-sm font-medium">Back to Blogs</span>
      </Link>

      <h2 className="text-2xl font-semibold mb-4">
        {editBlog ? 'Update Blog Post' : 'Create Blog Post'}
      </h2>

      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Editor
        apiKey="nwpfrqu2brgnghj0jbw2g4iaxo2wpt04wimcfhkcwzvoxvb2"
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists',
            'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed',
            'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable',
            'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments',
            'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography',
            'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | ' +
            'link image media table mergetags | addcomment showcomments | spellcheckdialog ' +
            'a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | ' +
            'emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
        }}
      />

      <button
        onClick={apiUrl}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Use AI
      </button>

      <div className="mt-4">
        <PublishButton
          title={title}
          content={content}
          isEditing={!!editBlog}
          blogId={editBlog?._id}
        />
      </div>
    </div>
  );
}

export default BlogMaker;
