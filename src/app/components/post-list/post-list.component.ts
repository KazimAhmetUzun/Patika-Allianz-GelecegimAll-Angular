import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  isEditing = false;
  editedPost: Post = {
    postId: 0,
    userId: 0,
    categoryId: 0,
    title: '',
    content: '',
    viewCount: 0,
    creationDate: '',
    isPublished: false
  };
  newPost: Post = {
    postId: 0,
    userId: 0,
    categoryId: 0,
    title: '',
    content: '',
    viewCount: 0,
    creationDate: '',
    isPublished: false
  };
  userIdFilter: number | null = null;
  postIdFilter: number | null = null;
  categoryIdFilter: number | null = null;

  currentPage = 1;
  pageSize = 15;
  totalPosts = 0;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.applyFilters();
      this.totalPosts = this.filteredPosts.length;
    });
  }

  deletePost(post: Post): void {
    if (post.comments && post.comments.length > 0) {
      alert('Cannot delete this post because it has associated comments!');
      return;
    }
    this.postService.deletePost(post.postId);
    this.loadPosts();
  }

  editPost(post: Post): void {
    this.isEditing = true;
    this.editedPost = { ...post };
  }

  savePost(): void {
    this.postService.updatePost(this.editedPost);
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedPost = {
      postId: 0,
      userId: 0,
      categoryId: 0,
      title: '',
      content: '',
      viewCount: 0,
      creationDate: '',
      isPublished: false
    };
  }

  addPost(): void {
    if (this.newPost.title && this.newPost.content && this.newPost.categoryId) {
      const currentDate = new Date();
      this.newPost.creationDate = currentDate.toISOString();
      this.newPost.postId = this.generatePostId();
      this.postService.addPost(this.newPost);
      this.newPost = {
        postId: 0,
        userId: 0,
        categoryId: 0,
        title: '',
        content: '',
        viewCount: 0,
        creationDate: '',
        isPublished: false
      };
      this.loadPosts();
    } else {
      alert('Please fill in all fields.');
    }
  }

  goToPostDetail(postId: number): void {
    this.router.navigate(['/posts', postId]);
  }

  applyFilters(): void {
    this.filteredPosts = this.posts.filter(post => {
      if (this.userIdFilter && post.userId !== this.userIdFilter) {
        return false;
      }
      if (this.postIdFilter && post.postId !== this.postIdFilter) {
        return false;
      }
      if (this.categoryIdFilter && post.categoryId !== this.categoryIdFilter) {
        return false;
      }
      return true;
    });
  }

  clearFilters(): void {
    this.userIdFilter = null;
    this.postIdFilter = null;
    this.categoryIdFilter = null;
    this.applyFilters();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    const totalPages = Math.ceil(this.totalPosts / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  getPaginatedPosts(): Post[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredPosts.slice(startIndex, endIndex);
  }

  private generatePostId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
