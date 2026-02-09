package com.iplproject.iplapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@ComponentScan("com.iplproject.iplapi")
@EntityScan("com.iplproject.iplapi.model")
@EnableJpaRepositories("com.iplproject.iplapi.repository")

@SpringBootApplication
public class IpLrestApiDemo1Application {
    public static void main(String[] args) {
        SpringApplication.run(IpLrestApiDemo1Application.class, args);
    }
}
