package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@ComponentScan(basePackages = {"dao", "model", "util", "controller"})
@SpringBootApplication

public class BdProjetoApplication {

	public static void main(String[] args) {
		SpringApplication.run(BdProjetoApplication.class, args);
	}

}
