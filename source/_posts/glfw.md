---
title: Ubuntu 安装 glfw 和 OpenGL
date: 2018-07-29 11:33:06
categories: 
- 计算机拾遗
notshow: true
---

Ubuntu 安装 glfw 和 OpenGL

<!-- more -->

# 安装 glfw

## 下载源码，解压
在[官网](www.glfw.org)下载最新源码 `glfw-x.x.x.zip`

解压

```shell
unzip glfw-x.x.x.zip
```

## 编译安装
1. 安装依赖库

    ```shell
    sudo apt install build-essential cmake
    ```
2. 进入 glfw-x.x.x 目录，建立glfw-build子目录

    ```shell
    sudo mkdir glfw-build
    ```


3. 进入glfw-build，使用cmake命令生成Makefile

    ```shell
    sudo cmake ../
    ```

4. make && make install

    ```shell
    sudo make
    sudo make install
    ```

5. 测试运行

    新建文件 `test.c`

    ```c
    #include <GLFW/glfw3.h>

    int main(void)
    {
        GLFWwindow* window;

        /* Initialize the library */
        if (!glfwInit())
            return -1;

        /* Create a windowed mode window and its OpenGL context */
        window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);
        if (!window)
        {
            glfwTerminate();
            return -1;
        }

        /* Make the window's context current */
        glfwMakeContextCurrent(window);

        /* Loop until the user closes the window */
        while (!glfwWindowShouldClose(window))
        {
            /* Render here */
            glClear(GL_COLOR_BUFFER_BIT);

            /* Swap front and back buffers */
            glfwSwapBuffers(window);

            /* Poll for and process events */
            glfwPollEvents();
        }

        glfwTerminate();
        return 0;
    }
    ```

6. 编译测试
    
    * 查看链接命令，每个输出结果连接起来。

    ```bash
    pkg-config --static --libs glfw3
    # -L/usr/local/lib -lglfw3 -lrt -lm -ldl -lXrandr -lXinerama -lXxf86vm -lXext -lXcursor -lXrender -lXfixes -lX11 -lpthread -lxcb -lXau -lXdmcp
    pkg-config --libs gl
    # -lGL
    # 另外还需链接：
    # -lX11 -lm -lrt -ldl
    ```

    * 组成编译语句

    ```bash
    gcc -o test test.c -L/usr/local/lib -lglfw3 -lrt -lm -ldl -lXrandr -lXinerama -lXxf86vm -lXext -lXcursor -lXrender -lXfixes -lX11 -lpthread -lxcb -lXau -lXdmcp -lGL -lX11 -lm -lrt -ldl
    ```
# 安装 OpenGL

1. 一行全部安装：编译环境, OpenGLLibrary, OpenGLUtilities, OpenGLUtility Toolkit

    ```shell
    sudo apt-get install build-essential libgl1-mesa-dev libglu1-mesa-dev freeglut3-dev
    ```

2. 此时openGL安装完毕,以下为测试阶段

    新建文件 `opengl.c`

    ```c
    #include <GL/glut.h>

    void init(void) {
        glClearColor(0.0, 0.0, 0.0, 0.0);
        glMatrixMode(GL_PROJECTION);
        glOrtho(-5, 5, -5, 5, 5, 15);
        glMatrixMode(GL_MODELVIEW);
        gluLookAt(0, 0, 10, 0, 0, 0, 0, 1, 0);
        return;
    }

    void display(void) {
        glClear(GL_COLOR_BUFFER_BIT);
        glColor3f(1.0, 0, 0);
        glutWireTeapot(3);
        glFlush();
        return;
    }

    int main(int argc, char * argv[]) {
        glutInit( & argc, argv);
        glutInitDisplayMode(GLUT_RGB | GLUT_SINGLE);
        glutInitWindowPosition(0, 0);
        glutInitWindowSize(300, 300);
        glutCreateWindow("OpenGL 3D View");
        init();
        glutDisplayFunc(display);
        glutMainLoop();
        return 0;
    }
    ```

    ```bash
    gcc -o opengl opengl.c -lGL -lGLU -lglut    # 编译
    ./opengl                                    # 之后执行
    ```

* 正常的话能看到一个茶壶。

![茶壶](/images/opengl_pot.png)
