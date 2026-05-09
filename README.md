# EcoHub-Frontend

## Project Description
EcoHub is a community portal frontend application that enables members to share sustainability ideas, vote on solutions, and collaborate on environmental projects. Built with Next.js and Tailwind CSS, it provides a seamless experience for both regular users and admins.

## Live URLs
- Backend API: `https://ecohub-backend-jkya.onrender.com`
- Frontend: `https://ecohub-frontend.vercel.app/`

## Features

### Public Pages
- Home page with hero banner, featured ideas, and newsletter
- All Ideas page with search, filters, and pagination
- Idea Details page with voting system
- About Us page
- Blog page
- Login & Registration pages

### Member Features (Logged In)
- Create, edit, and delete sustainability ideas
- Submit ideas for admin review
- Upvote/downvote on ideas (Reddit-like system)
- Purchase access to paid ideas
- Comment on ideas with nested replies (optional)
- Member dashboard with personal stats
- My Ideas section with status filtering
- Profile page

### Admin Features
- Admin dashboard with:
  - View all ideas by status (Under Review, Approved, Rejected)
  - Approve/Reject ideas with feedback
  - View all users
  - Activate/Deactivate users
  - Edit user roles (Member/Admin)

### Core Functionality
- Search ideas by keyword, title, or description
- Filter by category (Energy, Waste, Transportation)
- Filter by payment status (Free/Paid)
- Filter by vote range
- Sort by Recent or Top Voted
- Pagination (10-12 ideas per page)
- Responsive design (Mobile, Tablet, Desktop)

## Technologies Used

| Technology | Purpose |
|------------|---------|
| Next.js | React framework with SSR |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Query | Server state management |
| Axios | API calls |
| JWT | Authentication |
| React Hook Form | Form handling |

