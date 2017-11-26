#include<stdio.h>
#include<string.h>
int main(){
	char cmd[255];
	char front[255] = "node sendtest.js ";
	char* rCmd;
	while(1){
		printf("type cmd > ");
		scanf("%s", cmd);
		if(!strcmp(cmd,"EXIT")){
			break;
		}else{
			strcat(front, cmd);
			system(front);
		}
		
	}

	return 0;
}
