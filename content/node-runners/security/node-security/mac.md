---
title: Node security for RaspberryPi
weight: 10
---

## Backing up your Raspberry Pi node ID

For this we shall be using Putty and Windows Powershell (Terminal in Linux/MacOS).

So open up Putty and SSH into your RPI using the following command:

Now to copy the keystore folder to your home directory. 

```
$ sudo cp -r /var/lib/mysterium-node/keystore /home/pi
```

Make sure that it is properly copied.

```
sudo ls -la /home/pi
```

Change the ownership of the folder and files.

```
$ sudo chown -R pi keystore
```

Now you will have a keystore folder on your home directory and you are finished with  
putty.  

Open up Windows Powershell.

```
> scp -r pi@rpi-ip-address:/home/pi/keystore .
```

Now in your Windows user folder you will find the keystore folder with a UTC* file, you have now backed up your Mysterium node ID.



## Restoring your Raspberry Pi node ID

With these commands you will be able to restore your node ID that you have previously backed up.

We shall use Putty and Windows PowerShell.

First to transfer the keystore folder back to the Raspberry PI with PowerShell.

```
> scp -r keystore pi@raspberry_ip:/home/pi/
```

Open Putty to change the ownership and move the folder to the correct location.

```
$ sudo chown -R mysterium-node:mysterium-node keystore$ sudo mv keystore /var/lib/mysterium-node/
```

Now you can start Mysterium with your node ID.
