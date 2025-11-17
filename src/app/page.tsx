'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Dumbbell, Apple, User, Settings, Bell, Plus, TrendingUp, Calendar, Award, Trophy, Star, Zap, Target, Crown, Medal, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

type Post = {
  id: number
  author: string
  avatar: string
  time: string
  content: string
  image?: string
  likes: number
  comments: number
  liked: boolean
}

type Workout = {
  id: number
  name: string
  duration: string
  exercises: number
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  category: string
}

type Meal = {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  time: string
}

type CheckIn = {
  id: number
  date: string
  workout: string
  completed: boolean
}

type UserBadge = {
  id: number
  name: string
  description: string
  icon: string
  earned: boolean
  progress?: number
  target?: number
}

type LeaderboardUser = {
  id: number
  name: string
  avatar: string
  points: number
  rank: number
  badges: number
  streak: number
}

export default function FitnessApp() {
  const [activeTab, setActiveTab] = useState('feed')
  const [notifications, setNotifications] = useState(3)
  const [userPoints, setUserPoints] = useState(1250)
  const [userLevel, setUserLevel] = useState(8)
  const [userStreak, setUserStreak] = useState(12)
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Maria Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      time: 'há 2 horas',
      content: 'Acabei de completar meu treino de pernas! 💪 Sensação incrível!',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
      likes: 24,
      comments: 5,
      liked: false
    },
    {
      id: 2,
      author: 'João Santos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      time: 'há 4 horas',
      content: 'Nova meta: correr 10km em menos de 50 minutos! Quem topa o desafio? 🏃‍♂️',
      likes: 18,
      comments: 8,
      liked: true
    },
    {
      id: 3,
      author: 'Ana Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      time: 'há 6 horas',
      content: 'Preparei um almoço super saudável hoje! 🥗 Receita nos comentários!',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
      likes: 32,
      comments: 12,
      liked: false
    }
  ])

  const [workouts] = useState<Workout[]>([
    { id: 1, name: 'Treino de Peito e Tríceps', duration: '45 min', exercises: 8, difficulty: 'Médio', category: 'Força' },
    { id: 2, name: 'HIIT Cardio Intenso', duration: '30 min', exercises: 6, difficulty: 'Difícil', category: 'Cardio' },
    { id: 3, name: 'Yoga para Iniciantes', duration: '60 min', exercises: 12, difficulty: 'Fácil', category: 'Flexibilidade' },
    { id: 4, name: 'Treino de Costas e Bíceps', duration: '50 min', exercises: 9, difficulty: 'Médio', category: 'Força' },
    { id: 5, name: 'Core e Abdômen', duration: '25 min', exercises: 10, difficulty: 'Médio', category: 'Força' }
  ])

  const [meals] = useState<Meal[]>([
    { id: 1, name: 'Café da Manhã - Aveia com Frutas', calories: 350, protein: 12, carbs: 58, fat: 8, time: '08:00' },
    { id: 2, name: 'Almoço - Frango Grelhado com Arroz Integral', calories: 520, protein: 45, carbs: 52, fat: 12, time: '12:30' },
    { id: 3, name: 'Lanche - Shake de Proteína', calories: 180, protein: 25, carbs: 15, fat: 3, time: '16:00' },
    { id: 4, name: 'Jantar - Salmão com Legumes', calories: 450, protein: 38, carbs: 28, fat: 18, time: '19:30' }
  ])

  const [checkIns] = useState<CheckIn[]>([
    { id: 1, date: '2024-01-15', workout: 'Treino de Peito', completed: true },
    { id: 2, date: '2024-01-14', workout: 'HIIT Cardio', completed: true },
    { id: 3, date: '2024-01-13', workout: 'Treino de Pernas', completed: true },
    { id: 4, date: '2024-01-12', workout: 'Yoga', completed: false },
    { id: 5, date: '2024-01-11', workout: 'Treino de Costas', completed: true }
  ])

  const [badges] = useState<UserBadge[]>([
    { id: 1, name: 'Iniciante', description: 'Complete seu primeiro treino', icon: '🎯', earned: true },
    { id: 2, name: 'Consistente', description: 'Faça check-in por 7 dias seguidos', icon: '🔥', earned: true, progress: 12, target: 7 },
    { id: 3, name: 'Guerreiro', description: 'Complete 50 treinos', icon: '⚔️', earned: false, progress: 34, target: 50 },
    { id: 4, name: 'Nutricionista', description: 'Registre 30 refeições', icon: '🥗', earned: false, progress: 18, target: 30 },
    { id: 5, name: 'Social', description: 'Faça 20 posts no feed', icon: '💬', earned: false, progress: 12, target: 20 },
    { id: 6, name: 'Maratonista', description: 'Acumule 100km de corrida', icon: '🏃', earned: false, progress: 67, target: 100 },
    { id: 7, name: 'Mestre', description: 'Alcance nível 10', icon: '👑', earned: false, progress: 8, target: 10 },
    { id: 8, name: 'Influencer', description: 'Receba 100 curtidas', icon: '⭐', earned: true }
  ])

  const [leaderboard] = useState<LeaderboardUser[]>([
    { id: 1, name: 'Carlos Mendes', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop', points: 2450, rank: 1, badges: 12, streak: 28 },
    { id: 2, name: 'Fernanda Lima', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', points: 2180, rank: 2, badges: 10, streak: 21 },
    { id: 3, name: 'Ricardo Alves', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', points: 1890, rank: 3, badges: 9, streak: 15 },
    { id: 4, name: 'Você', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', points: 1250, rank: 4, badges: 3, streak: 12 },
    { id: 5, name: 'Paula Santos', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop', points: 1120, rank: 5, badges: 7, streak: 9 }
  ])

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
    // Adiciona pontos por interação no feed
    if (!posts.find(p => p.id === postId)?.liked) {
      setUserPoints(prev => prev + 5)
    }
  }

  const handleCheckIn = () => {
    setUserPoints(prev => prev + 50)
    setUserStreak(prev => prev + 1)
  }

  const handleWorkoutComplete = () => {
    setUserPoints(prev => prev + 100)
  }

  const handleMealLog = () => {
    setUserPoints(prev => prev + 25)
  }

  const handlePost = () => {
    setUserPoints(prev => prev + 30)
  }

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const completedCheckIns = checkIns.filter(c => c.completed).length
  const nextLevelPoints = (userLevel + 1) * 200
  const levelProgress = (userPoints % 200) / 2

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                FitLife
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Pontos e Nível */}
              <div className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full">
                <Star className="w-5 h-5 fill-current" />
                <div className="text-sm">
                  <p className="font-bold">{userPoints} pts</p>
                  <p className="text-xs opacity-90">Nível {userLevel}</p>
                </div>
              </div>

              {/* Streak */}
              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full">
                <Flame className="w-5 h-5 fill-current" />
                <span className="font-bold">{userStreak} dias</span>
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
              <Avatar className="w-9 h-9 cursor-pointer ring-2 ring-purple-500/20">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                <AvatarFallback>EU</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-sm">
            <TabsTrigger value="feed" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Feed</span>
            </TabsTrigger>
            <TabsTrigger value="workouts" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Treinos</span>
            </TabsTrigger>
            <TabsTrigger value="diet" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
              <Apple className="w-4 h-4" />
              <span className="hidden sm:inline">Dieta</span>
            </TabsTrigger>
            <TabsTrigger value="gamification" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Conquistas</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <div className="flex gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                  <AvatarFallback>EU</AvatarFallback>
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1 justify-start text-muted-foreground hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50">
                      Compartilhe seu progresso... (+30 pts)
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Criar Post (+30 pontos)</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea placeholder="O que você está fazendo hoje?" className="min-h-32" />
                      <div className="flex gap-2">
                        <Button 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                          onClick={handlePost}
                        >
                          Publicar
                        </Button>
                        <Button variant="outline">Adicionar Foto</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border-0 transition-all hover:shadow-xl">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-12 h-12 ring-2 ring-purple-500/20">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{post.author}</p>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full rounded-xl mb-4 object-cover max-h-96"
                      />
                    )}
                    <div className="flex items-center gap-6 pt-4 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`gap-2 ${post.liked ? 'text-red-500' : ''}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                        {post.likes}
                        {!post.liked && <span className="text-xs text-green-600">(+5 pts)</span>}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="w-5 h-5" />
                        {post.comments}
                        <span className="text-xs text-green-600">(+10 pts)</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Seus Treinos</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    <Plus className="w-4 h-4" />
                    Novo Treino
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Novo Treino</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nome do Treino</Label>
                      <Input placeholder="Ex: Treino de Pernas" />
                    </div>
                    <div>
                      <Label>Duração</Label>
                      <Input placeholder="Ex: 45 minutos" />
                    </div>
                    <div>
                      <Label>Dificuldade</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Fácil</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="hard">Difícil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
                      Criar Treino
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <Card key={workout.id} className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={workout.difficulty === 'Fácil' ? 'secondary' : workout.difficulty === 'Médio' ? 'default' : 'destructive'}>
                      {workout.difficulty}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{workout.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {workout.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4" />
                      {workout.exercises} exercícios
                    </div>
                    <Badge variant="outline" className="mt-2">{workout.category}</Badge>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    onClick={handleWorkoutComplete}
                  >
                    Iniciar Treino (+100 pts)
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Diet Tab */}
          <TabsContent value="diet" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg border-0">
                <p className="text-sm opacity-90 mb-1">Calorias Totais</p>
                <p className="text-3xl font-bold">{totalCalories}</p>
                <p className="text-sm opacity-90">kcal/dia</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg border-0">
                <p className="text-sm opacity-90 mb-1">Proteínas</p>
                <p className="text-3xl font-bold">{totalProtein}g</p>
                <p className="text-sm opacity-90">por dia</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg border-0">
                <p className="text-sm opacity-90 mb-1">Refeições</p>
                <p className="text-3xl font-bold">{meals.length}</p>
                <p className="text-sm opacity-90">por dia</p>
              </Card>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Plano Alimentar</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <Plus className="w-4 h-4" />
                    Nova Refeição (+25 pts)
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Refeição (+25 pontos)</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nome da Refeição</Label>
                      <Input placeholder="Ex: Café da Manhã" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Calorias</Label>
                        <Input type="number" placeholder="350" />
                      </div>
                      <div>
                        <Label>Proteínas (g)</Label>
                        <Input type="number" placeholder="25" />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                      onClick={handleMealLog}
                    >
                      Adicionar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {meals.map((meal) => (
                <Card key={meal.id} className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{meal.name}</h3>
                      <p className="text-sm text-gray-500">{meal.time}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Apple className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{meal.calories}</p>
                      <p className="text-xs text-gray-500">kcal</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{meal.protein}g</p>
                      <p className="text-xs text-gray-500">Proteína</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{meal.carbs}g</p>
                      <p className="text-xs text-gray-500">Carbos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{meal.fat}g</p>
                      <p className="text-xs text-gray-500">Gordura</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gamification Tab - NOVO */}
          <TabsContent value="gamification" className="space-y-6">
            {/* Stats do Usuário */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl border-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Seus Pontos</p>
                    <p className="text-4xl font-bold">{userPoints}</p>
                  </div>
                  <Star className="w-12 h-12 fill-current opacity-80" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Nível {userLevel}</span>
                    <span>Nível {userLevel + 1}</span>
                  </div>
                  <Progress value={levelProgress} className="h-2 bg-white/30" />
                  <p className="text-xs opacity-90">{nextLevelPoints - (userPoints % 200)} pts para próximo nível</p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-xl border-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Sequência</p>
                    <p className="text-4xl font-bold">{userStreak}</p>
                    <p className="text-sm opacity-90">dias seguidos</p>
                  </div>
                  <Flame className="w-12 h-12 fill-current opacity-80" />
                </div>
                <p className="text-sm opacity-90">Continue assim! Não quebre sua sequência!</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl border-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Conquistas</p>
                    <p className="text-4xl font-bold">{badges.filter(b => b.earned).length}/{badges.length}</p>
                    <p className="text-sm opacity-90">badges desbloqueadas</p>
                  </div>
                  <Trophy className="w-12 h-12 opacity-80" />
                </div>
                <Progress value={(badges.filter(b => b.earned).length / badges.length) * 100} className="h-2 bg-white/30" />
              </Card>
            </div>

            {/* Quadro de Líderes */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Quadro de Líderes</h2>
                  <p className="text-sm text-gray-500">Top 5 desta semana</p>
                </div>
              </div>

              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <Card 
                    key={user.id} 
                    className={`p-4 transition-all ${
                      user.name === 'Você' 
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-500' 
                        : 'bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                        user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                        user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                        user.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {user.rank === 1 ? <Crown className="w-6 h-6" /> : 
                         user.rank === 2 ? <Medal className="w-6 h-6" /> :
                         user.rank === 3 ? <Award className="w-6 h-6" /> :
                         `#${user.rank}`}
                      </div>

                      {/* Avatar e Info */}
                      <Avatar className="w-12 h-12 ring-2 ring-purple-500/20">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                            {user.points} pts
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-purple-500" />
                            {user.badges}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4 fill-red-500 text-red-500" />
                            {user.streak}d
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Badges de Conquista */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Suas Conquistas</h2>
                  <p className="text-sm text-gray-500">Desbloqueie todas as badges!</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {badges.map((badge) => (
                  <Card 
                    key={badge.id} 
                    className={`p-4 transition-all ${
                      badge.earned 
                        ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-500 shadow-lg' 
                        : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-5xl mb-3 ${badge.earned ? 'animate-bounce' : 'grayscale'}`}>
                        {badge.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{badge.name}</h3>
                      <p className="text-xs text-gray-600 mb-3">{badge.description}</p>
                      
                      {!badge.earned && badge.progress !== undefined && badge.target !== undefined && (
                        <div className="space-y-1">
                          <Progress value={(badge.progress / badge.target) * 100} className="h-2" />
                          <p className="text-xs text-gray-500">{badge.progress}/{badge.target}</p>
                        </div>
                      )}

                      {badge.earned && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
                          Desbloqueada!
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Sistema de Pontos */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Como Ganhar Pontos</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Completar Treino</p>
                    <p className="text-sm text-gray-600">+100 pontos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                    <Apple className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Registrar Refeição</p>
                    <p className="text-sm text-gray-600">+25 pontos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Check-in Diário</p>
                    <p className="text-sm text-gray-600">+50 pontos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Criar Post</p>
                    <p className="text-sm text-gray-600">+30 pontos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Curtir Post</p>
                    <p className="text-sm text-gray-600">+5 pontos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Comentar</p>
                    <p className="text-sm text-gray-600">+10 pontos</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 text-white shadow-xl border-0">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="w-24 h-24 ring-4 ring-white/50">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" />
                  <AvatarFallback>EU</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-3xl font-bold mb-2">Seu Nome</h2>
                  <p className="opacity-90 mb-4">Membro desde Janeiro 2024</p>
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    <div>
                      <p className="text-2xl font-bold">{completedCheckIns}</p>
                      <p className="text-sm opacity-90">Check-ins</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{workouts.length}</p>
                      <p className="text-sm opacity-90">Treinos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm opacity-90">Seguidores</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Histórico de Check-ins</h3>
                <Button 
                  className="bg-gradient-to-r from-green-500 to-emerald-500"
                  onClick={handleCheckIn}
                >
                  Check-in Hoje (+50 pts)
                </Button>
              </div>
              <div className="space-y-3">
                {checkIns.map((checkIn) => (
                  <Card key={checkIn.id} className="p-4 bg-white/80 backdrop-blur-sm shadow-lg border-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          checkIn.completed 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                            : 'bg-gray-200'
                        }`}>
                          <Award className={`w-5 h-5 ${checkIn.completed ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{checkIn.workout}</p>
                          <p className="text-sm text-gray-500">{checkIn.date}</p>
                        </div>
                      </div>
                      <Badge variant={checkIn.completed ? 'default' : 'secondary'}>
                        {checkIn.completed ? 'Completo' : 'Pendente'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Painel Administrativo</h2>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <p className="text-sm opacity-90">Total de Usuários</p>
                  <p className="text-3xl font-bold">1,234</p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                  <p className="text-sm opacity-90">Posts Hoje</p>
                  <p className="text-3xl font-bold">89</p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <p className="text-sm opacity-90">Treinos Ativos</p>
                  <p className="text-3xl font-bold">456</p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-orange-500 to-red-500 text-white">
                  <p className="text-sm opacity-90">Check-ins Hoje</p>
                  <p className="text-3xl font-bold">234</p>
                </Card>
              </div>

              <Tabs defaultValue="users" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="users">Usuários</TabsTrigger>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="workouts">Treinos</TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-4">
                  <div className="flex gap-4">
                    <Input placeholder="Buscar usuários..." className="flex-1" />
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                      Buscar
                    </Button>
                  </div>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Card key={i} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>U{i}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">Usuário {i}</p>
                                <p className="text-sm text-gray-500">usuario{i}@email.com</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Gerenciar</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="posts">
                  <p className="text-gray-500">Gerenciamento de posts em desenvolvimento...</p>
                </TabsContent>

                <TabsContent value="workouts">
                  <p className="text-gray-500">Gerenciamento de treinos em desenvolvimento...</p>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
