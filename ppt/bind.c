#include <stdio.h> 
#include <unistd.h> 
#include <termios.h> 
  
static struct termios initial_settings, new_settings; 
static int peek_character = -1; 
  
void init()
{ 
     tcgetattr(0, &initial_settings); 
     new_settings = initial_settings; 
     new_settings.c_lflag &= ~(ICANON|ISIG|TOSTOP); 
     new_settings.c_cc[VMIN] = 1; 
     new_settings.c_cc[VTIME] = 0; 
     tcsetattr(0, TCSANOW, &new_settings); 
} 
  
void close_bind(){ 
     tcsetattr(0, TCSANOW, &initial_settings); 
} 
  
int bind()//监听键盘 
{ 
     unsigned char ch; 
     int nread; 
  
     if (peek_character != -1) 
         return 1; 
     new_settings.c_cc[VMIN]=0; 
     tcsetattr(0, TCSANOW, &new_settings); 
     nread = read(0, &ch, 1); 
     new_settings.c_cc[VMIN]=1; 
     tcsetattr(0, TCSANOW, &new_settings); 
     if(nread == 1) 
     { 
         peek_character = ch; 
         return 1; 
     } 
     return 0; 
} 
  
int get()//读取字符 
{ 
     char ch; 
  
     if(peek_character != -1) 
     { 
         ch = peek_character; 
         peek_character = -1; 
         return ch; 
     } 
     read(0, &ch, 1); 
     return ch; 
} 
  
int main() 
{ 
     init(); 
     FILE *fp; 
     fp = fopen("KeyBind", "w"); 
     while(1)  
     { 
         while(!bind()) 
             ; 
         char ch = get(); 
         if(ch == '-') 
            break; 
         fprintf(fp, "%c", ch); 
     } 
     fclose(fp); 
     close_bind(); 
     printf("\nBind end!\n"); 
} 
