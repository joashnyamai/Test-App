import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Users, Calendar, Target, X } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  teamSize: number;
  startDate: string;
  endDate: string;
  progress: number;
}

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'completed' | 'on-hold',
    teamSize: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    progress: 0
  });

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Development of a new e-commerce platform with modern features',
      status: 'active',
      teamSize: 8,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      progress: 65
    },
    {
      id: '2',
      name: 'Mobile Banking App',
      description: 'Mobile application for banking services with enhanced security',
      status: 'active',
      teamSize: 12,
      startDate: '2024-02-01',
      endDate: '2024-08-15',
      progress: 45
    },
    {
      id: '3',
      name: 'CRM System',
      description: 'Customer relationship management system for sales team',
      status: 'completed',
      teamSize: 6,
      startDate: '2023-10-01',
      endDate: '2024-01-31',
      progress: 100
    },
    {
      id: '4',
      name: 'AI Analytics Dashboard',
      description: 'Dashboard for analyzing business metrics with AI insights',
      status: 'on-hold',
      teamSize: 4,
      startDate: '2024-03-01',
      endDate: '2024-07-31',
      progress: 25
    }
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (field: keyof typeof newProject, value: string | number) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      alert('Please enter a project name');
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      status: newProject.status,
      teamSize: newProject.teamSize,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      progress: newProject.progress
    };

    setProjects(prev => [...prev, project]);
    
    // Reset form
    setNewProject({
      name: '',
      description: '',
      status: 'active',
      teamSize: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      progress: 0
    });

    setIsDialogOpen(false);
  };

  const handleViewDetails = (project: Project) => {
    alert(`Project Details:\nName: ${project.name}\nDescription: ${project.description}\nStatus: ${project.status}\nTeam Size: ${project.teamSize}\nProgress: ${project.progress}%`);
  };

  const handleTrackProject = (project: Project) => {
    alert(`Tracking project: ${project.name}\nThis would open a detailed tracking view for the project.`);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      description: project.description,
      status: project.status,
      teamSize: project.teamSize,
      startDate: project.startDate,
      endDate: project.endDate,
      progress: project.progress
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateProject = () => {
    if (!newProject.name.trim()) {
      alert('Please enter a project name');
      return;
    }

    if (editingProject) {
      setProjects(prev => prev.map(project => 
        project.id === editingProject.id 
          ? { ...project, ...newProject }
          : project
      ));
      
      // Reset form and close dialog
      setNewProject({
        name: '',
        description: '',
        status: 'active',
        teamSize: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        progress: 0
      });
      setEditingProject(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== projectId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and track all your projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Fill in the details for the new project.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Project Name</Label>
                <Input 
                  placeholder="Enter project name" 
                  value={newProject.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  placeholder="Enter project description" 
                  value={newProject.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select 
                  value={newProject.status} 
                  onValueChange={(value) => handleInputChange('status', value as 'active' | 'completed' | 'on-hold')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Team Size</Label>
                <Input 
                  type="number" 
                  placeholder="Enter team size" 
                  value={newProject.teamSize}
                  onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input 
                  type="date" 
                  value={newProject.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input 
                  type="date" 
                  value={newProject.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
              <div>
                <Label>Progress (%)</Label>
                <Input 
                  type="number" 
                  min="0" 
                  max="100" 
                  placeholder="0-100" 
                  value={newProject.progress}
                  onChange={(e) => handleInputChange('progress', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Edit Project Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Update the details for the project.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Project Name</Label>
                <Input 
                  placeholder="Enter project name" 
                  value={newProject.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  placeholder="Enter project description" 
                  value={newProject.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select 
                  value={newProject.status} 
                  onValueChange={(value) => handleInputChange('status', value as 'active' | 'completed' | 'on-hold')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Team Size</Label>
                <Input 
                  type="number" 
                  placeholder="Enter team size" 
                  value={newProject.teamSize}
                  onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input 
                  type="date" 
                  value={newProject.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input 
                  type="date" 
                  value={newProject.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
              <div>
                <Label>Progress (%)</Label>
                <Input 
                  type="number" 
                  min="0" 
                  max="100" 
                  placeholder="0-100" 
                  value={newProject.progress}
                  onChange={(e) => handleInputChange('progress', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateProject}>
                Update Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Project Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{project.teamSize} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{project.startDate}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetails(project)}
                >
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleTrackProject(project)}
                >
                  <Target className="w-4 h-4 mr-1" />
                  Track
                </Button>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditProject(project)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Projects;
